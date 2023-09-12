import React from "react";
export default function Loader() {
  return (
    <div className="loader">
    <svg class="bike" viewBox="0 0 48 30" width="48px" height="30px">
	<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
		<g transform="translate(9.5,19)">
			<circle class="bike__tire" r="9" strokeDasharray="56.549 56.549" />
			<g class="bike__spokes-spin" strokeDasharray="31.416 31.416" strokeDashoffset="-23.562">
				<circle class="bike__spokes" r="5" />
				<circle class="bike__spokes" r="5" transform="rotate(180,0,0)" />
			</g>
		</g>
		<g transform="translate(24,19)">
			<g class="bike__pedals-spin" strokeDasharray="25.133 25.133" strokeDashoffset="-21.991" transform="rotate(67.5,0,0)">
				<circle class="bike__pedals" r="4" />
				<circle class="bike__pedals" r="4" transform="rotate(180,0,0)" />
			</g>
		</g>
		<g transform="translate(38.5,19)">
			<circle class="bike__tire" r="9" strokeDasharray="56.549 56.549" />
			<g class="bike__spokes-spin" strokeDasharray="31.416 31.416" strokeDashoffset="-23.562">
				<circle class="bike__spokes" r="5" />
				<circle class="bike__spokes" r="5" transform="rotate(180,0,0)" />
			</g>
		</g>
		<polyline class="bike__seat" points="14 3,18 3" strokeDasharray="5 5" />
		<polyline class="bike__body" points="16 3,24 19,9.5 19,18 8,34 7,24 19" strokeDasharray="79 79" />
		<path class="bike__handlebars" d="m30,2h6s1,0,1,1-1,1-1,1" strokeDasharray="10 10" />
		<polyline class="bike__front" points="32.5 2,38.5 19" strokeDasharray="19 19" />
	</g>
</svg>
</div>
  );
}
