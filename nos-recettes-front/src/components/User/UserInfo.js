import { useRef, useEffect } from "react";
import classNames from "classnames";
/* Import Style */
import "./user.scss";

function UserInfo({ user, setNameWidth, hideEmail, className }) {
	const firstnameDiv = useRef(null);
	const lastnameDiv = useRef(null);

	const getDivWidth = (div) => {
		if (div.current === null) return "1rem";
		const divPadding = window.getComputedStyle(div.current).paddingRight;

		const finalDivWidth =
			div.current.clientWidth - Number(divPadding.replace("px", "")) * 2;

		return finalDivWidth + "px";
	};

	useEffect(() => {
		if (setNameWidth) {
			setNameWidth({
				lastname: { minWidth: getDivWidth(lastnameDiv) },
				firstname: { minWidth: getDivWidth(firstnameDiv) },
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const infoClass = classNames("user-info", className && className);

	return (
		<div className={infoClass}>
			<h3 className={"user-info__name"}>
				<span ref={firstnameDiv}>{user.firstname}</span>
				<span ref={lastnameDiv}>{user.lastname}</span>
			</h3>
			{!hideEmail && (
				<div className="user-info__more">
					<p>{user.email}</p>
				</div>
			)}
		</div>
	);
}

export default UserInfo;
