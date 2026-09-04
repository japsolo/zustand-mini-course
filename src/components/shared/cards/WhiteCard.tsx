import classNames from "classnames";

interface Props {
	children?: React.ReactNode;
	centered?: boolean;
	className?: string;
}

export const WhiteCard = ({ children, centered, className }: Props) => {
	return (
		<div
			className={classNames("p-10 w-full bg-white border rounded-[20px] shadow-3xl shadow-shadow-500", className, {
				"text-center": centered,
				"flex flex-col items-center": centered,
			})}
		>
			{children}
		</div>
	);
};
