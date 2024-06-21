export default function Theme({ data, className }) {
	const capitalizedData = data.charAt(0).toUpperCase() + data.slice(1);

	return (
		<div>
			<div className={className}>{capitalizedData}</div>
		</div>
	);
}
