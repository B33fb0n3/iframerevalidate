'use client'

import React, {createContext, ReactNode, useState} from 'react';

interface Action {
    undoAction: () => void;
    redoAction?: () => void; // Optional redo action
}

interface UndoRedoState {
    history: Action[];
    currentIndex: number;
    pushAction: (action: Action, shouldExecuteRedo: boolean) => void;
    undo: () => void;
    redo: () => void;
    clearHistory: () => void;
    isDirty: boolean;
    canUndo: boolean;
    canRedo: boolean;
}

const UndoRedoContext = createContext<UndoRedoState>({
    history: [],
    currentIndex: -1, // Initialize current index to -1 (no selection)
    pushAction: () => {
    },
    undo: () => {
    },
    redo: () => {
    },
    clearHistory: () => {
    },
    isDirty: false,
    canUndo: false,
    canRedo: false,
});

function UndoRedoProvider({children}: { children: ReactNode }) {
    const [history, setHistory] = useState<Action[]>([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const pushAction = (action: Action, shouldExecuteRedo: boolean) => {
        setHistory((prevHistory) => {
            const newHistory = [...prevHistory.slice(0, currentIndex + 1)]; // Keep past actions
            newHistory.push(action); // Add new action
            const returnedHistory = newHistory.length > 20 ? newHistory.slice(1) : newHistory

            setCurrentIndex(returnedHistory.length - 1); // Set current index to latest action
            return returnedHistory; // Limit history size
        });

        if (shouldExecuteRedo)
            executeRedo(action.redoAction);
    };

    const undo = () => {
        if (currentIndex >= 0 && currentIndex < history.length) {
            const lastAction = history[currentIndex];
            try {
                lastAction.undoAction();
            } catch (error) {
                console.error('Error during undo:', error);
                // Handle undo error appropriately
            }
            setCurrentIndex(currentIndex - 1); // Move current index back one step
        }
    };

    const redo = () => {
        if (currentIndex < history.length - 1) {
            const redoAction = history[currentIndex + 1]?.redoAction;
            executeRedo(redoAction);
            setCurrentIndex(currentIndex + 1); // Move current index forward one step
        }
    };

    const executeRedo = (action: Action["redoAction"]) => {
        if (action) {
            try {
                action();
            } catch (error) {
                console.error('Error during redo:', error);
                // Handle redo error appropriately
            }
        }
    }

    const clearHistory = () => {
        setCurrentIndex(-1)
        setHistory([])
    };

    const canUndo = currentIndex >= 0;
    const canRedo = currentIndex < history.length - 1;
    const isDirty = history.length > 0;

    const value = {history, currentIndex, pushAction, undo, redo, clearHistory, isDirty, canUndo, canRedo};

    return <UndoRedoContext.Provider value={value}>
        {children}
    </UndoRedoContext.Provider>
};

export {UndoRedoContext, UndoRedoProvider};
