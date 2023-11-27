export function AsideSection({ children }: { children: React.ReactNode }) {

    return (
    <section className="p-8 w-full min-w-min bg-base-200 text-base-content flex flex-col items-center gap-6">
        {children}
    </section>
        )
}
