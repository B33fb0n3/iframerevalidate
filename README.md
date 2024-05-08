Go on /counter/[id] and see the production version
Go on /editor/[id] and see the draft version

Update the draft version. You see, that the rendered page (counter) inside the editor will change synchronously with the state inside the editor.
The static production page won't be changed. It will change after you pushed the ``publish`` button.

This is how you update state inside the editor instantly while stil having caching and also updating production, whenever it's needed.