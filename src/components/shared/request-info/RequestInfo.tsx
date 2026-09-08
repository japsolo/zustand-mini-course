import { useEffect, useState } from "react";
import { tesloApi } from "@/api/teslo.api";

export const RequestInfo = () => {
	const [requestInfo, setRequestInfo] = useState<Record<string, unknown>>({});

	useEffect(() => {
		tesloApi
			.get("/auth/private")
			.then((response) => setRequestInfo(response.data))
			.catch(() => setRequestInfo({}));
	}, []);

	return (
		<div className="overflow-x-auto border border-dashed border-zinc-300">
			<h2>Información</h2>
			<pre>{JSON.stringify(requestInfo, null, 2)}</pre>
		</div>
	);
};
