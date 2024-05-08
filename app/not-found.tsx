import Link from 'next/link'
import Image from "next/image";
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <section>
            <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                <div className="relative w-full mb-12 lg:w-1/2 lg:mt-0">
                    <Image src="/404.svg" alt="notfound" width={365} height={115}/>
                </div>
                <div className="wf-ull lg:w-1/2">
                    <p>404 error</p>
                    <h1 className="mt-3 text-2xl font-semibold md:text-3xl">Page not found</h1>
                    <p className="mt-4">Sorry, the page you are looking for
                        doesn&apos;t exist. You can return home:</p>

                    <div className="flex items-center mt-6 gap-x-3">
                        <Button asChild>
                            <Link href={"/"}>Start</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}