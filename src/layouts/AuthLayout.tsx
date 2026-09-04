import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="hidden justify-center items-center w-1/2 h-screen bg-indigo-700 lg:flex lg:flex-col">
				<span className="text-9xl font-bold text-white">Zustand</span>
				{/* <img src="https://placehold.co/1440/667fff/ffffff.png?text=Zustand&font=Montserrat"
          alt="Placeholder Image"
          className="object-cover w-full h-full" /> */}
			</div>
			<div className="p-8 w-full lg:p-36 md:p-52 sm:20 lg:w-1/2">
				<Outlet />
			</div>
		</div>
	);
};
