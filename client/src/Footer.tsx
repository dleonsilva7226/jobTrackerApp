const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-auto">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Job Tracker. All rights reserved.
                </p>
                <p className="text-sm">
                    Developed by Daniel Leon Silva
                </p>
            </div>
        </footer>
    )

}

export default Footer