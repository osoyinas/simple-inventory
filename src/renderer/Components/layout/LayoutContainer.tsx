export function LayoutContainer({ children, className }: { children: React.ReactNode, className?: string}) {
    return (
        <section className={`${"w-full w-max-[1300px] m-auto relative bg-base-200 text-base-content flex flex-col items-center gap-6"} ${className}`}>
            {children}
        </section>
    );
}
