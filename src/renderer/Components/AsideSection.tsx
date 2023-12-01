export function AsideSection({ children }: { children: React.ReactNode }) {
    return (
        <section className="p-12 w-full w-max-[1300px] m-auto relative bg-base-200 text-base-content flex flex-col items-center gap-6">
            {children}
        </section>
    );
}
