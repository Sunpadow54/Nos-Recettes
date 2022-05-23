import { useState } from "react";
import classNames from "classnames";
/* Import Style */
import "./table.scss";
/* Import Icons */
import { IoMdClose } from "react-icons/io";
/* Import Components */
import BtnSimpleIcon from "../Buttons/BtnSimpleIcon";

function Table({ columns, children }) {
	const nbrCols = columns.length;
	const [rowShowned, setRowShowned] = useState(undefined);

	// ----- Handles
	const handleToogleRow = (i) => {
		if (i === rowShowned) setRowShowned(undefined);
		else setRowShowned(i);
	};

	const getCellType = (cellIndex, rowIndex) => {
		if (
			columns[cellIndex].hasOwnProperty("hasToogleBtn") &&
			children[rowIndex][nbrCols]
		) {
			return "toogleBtn";
		}
		if (columns[cellIndex].hasOwnProperty("scope")) {
			return "head";
		}
		return "default";
	};

	// ---- Elements

	const ToogleBtn = ({ indexRow, icon }) => (
		<BtnSimpleIcon
			icon={rowShowned === indexRow ? <IoMdClose /> : icon}
			color={{ text: "grey" }}
			onClick={() => handleToogleRow(indexRow)}
		/>
	);

	return (
		<table className="table-collapse">
			<thead>
				<tr>
					{columns.map((col, i) => (
						<th key={`col-head-${i}`} id={`col-${i}`}>
							{col.title}
						</th>
					))}
				</tr>
			</thead>

			<tbody>
				{children &&
					children.map((row, y) => (
						<>
							<tr key={"row-" + y}>
								{row.map(
									(item, z) =>
										z < nbrCols &&
										{
											toogleBtn: (
												<td
													key={`cell-${z}`}
													className={classNames(
														"toogle-btn",
														y === rowShowned &&
															"toogle-btn--close"
													)}
												>
													<div>
														<ToogleBtn
															indexRow={y}
															icon={item}
														/>
													</div>
												</td>
											),
											head: (
												<th
													key={`cell-${z}`}
													id={`row-head-${y}`}
												>
													<div>{item}</div>
												</th>
											),
											default: (
												<td
													key={`cell-${z}`}
													id={`row-head-${y}`}
												>
													<div>{item}</div>
												</td>
											),
										}[getCellType(z, y)]
								)}
							</tr>
							{row[nbrCols] && (
								<tr
									key={`hidden-row-${y}`}
									headers={`row-head-${y}`}
									className="hidden-row"
								>
									<td colSpan={nbrCols}>
										<div
											className={classNames(
												"hidden-row__container",
												rowShowned === y &&
													"hidden-row__container--show"
											)}
										>
											<div className="hidden-row__content">
												{row[nbrCols]}
											</div>
										</div>
									</td>
								</tr>
							)}
						</>
					))}
			</tbody>
		</table>
	);
}

export default Table;
