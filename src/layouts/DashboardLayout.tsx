import { Outlet } from "react-router-dom";
import { SideMenu } from "@/components";

export const DashboardLayout = () => {
	return (
		<div className="overflow-y-scroll w-screen h-screen antialiased bg-slate-200 text-slate-900 selection:bg-blue-900 selection:text-white">
			<div className="flex relative flex-row w-screen">
				<SideMenu />

				<div className="p-4 w-full">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
