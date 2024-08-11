export default function Loading() {
    return (
        <div className="flex justify-center bg-[#F7F5EB] items-center h-screen">
            <div className="flex flex-col items-center">
                <div className="w-20 h-20 border-t-4 border-b-4 border-yellow-500 rounded-full animate-spin">
                </div>
                <h1 className="text-lg text-black-600 font-bold mt-2">
                    Loading...
                </h1>
            </div>
        </div>
    )
}
