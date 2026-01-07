import Converter from "@/components/Converter";

export default function Home() {
    return (
        <main className="container flex-center" style={{ minHeight: '100vh', paddingBottom: '40px' }}>
            <Converter />
        </main>
    );
}
