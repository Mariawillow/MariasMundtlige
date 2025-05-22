export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="h-12 w-12 border-4 border-t-transparent border-[#6b5f6e] rounded-full animate-spin" />
        </div>
    );
}
