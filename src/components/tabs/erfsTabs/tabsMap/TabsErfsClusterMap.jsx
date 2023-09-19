import React, { useState, useRef, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import "./TabsErfsClusterMap.css";
import edumbe from "../../../../data/cadastral/edumbe/edumbe.geojson";
import useModal from "../../../../hooks/useModal";

const Marker = ({ children }) => children;

export function TabsErfsClusterMap(props) {
	// console.log(`props`, props);

	const mapRef = useRef();
	// console.log(`mapRef`, mapRef);

	const { openModal } = useModal();

	const [erfs, setErfs] = useState(props.rowData);
	// console.log(`erfs`, erfs);

	useEffect(() => {
		setErfs(props.rowData);
	}, [props.rowData]);

	// const erfs = props.rowData;
	// console.log(`erfs`, erfs);

	const points = erfs?.map(erf => {
		// console.log(`erf`, erf);
		// const lat = erf.address.gps.latitude;
		// const lng = erf.address.gps.longitude;

		return {
			type: "Feature",
			properties: { cluster: false, erfId: erf.id, erf: erf },
			geometry: {
				type: "Point",
				coordinates: [
					parseFloat(erf.address.gps.longitude),
					parseFloat(erf.address.gps.latitude),
				],
			},
		};
	});
	// console.log(`points`, points);

	const [bounds, setBounds] = useState([]);
	// console.log(`bounds`, bounds);
	const [zoom, setZoom] = useState(10);
	// console.log(`zoom`, zoom)

	// console.log(`######################################################`);
	// console.log(`bounds`, bounds);
	// console.log(`zoom`, zoom);

	const result = useSupercluster({
		points,
		bounds,
		zoom,
		options: { radius: 75, maxZoom: 20 },
	});

	const { clusters, supercluster } = result;
	// console.log(`clusters`, clusters);
	// console.log(`supercluster`, supercluster);

	// erf search/filter *************************************************

	const [selectedErf, setSelectedErf] = useState("");
	// console.log(`selectedErf`, selectedErf);
	const [erfSearch, setErfSearch] = useState("");
	// console.log(`erfSearch`, erfSearch);
	const [filteredErfs, setFilteredErfs] = useState("");
	// console.log(`filteredErfs`, filteredErfs);

	useEffect(() => {
		// console.log(`erfs`, erfs);
		const filteredErfs = erfs?.filter(erf => erf.erfNo.includes(erfSearch));
		// console.log(`filteredErfs`, filteredErfs);
		setFilteredErfs(filteredErfs);
	}, [erfSearch]);

	// console.log(`erfSearch.length`, erfSearch.length);
	const hideShow = erfSearch?.length > 0 ? "show-erfs" : "hide-erfs";

	useEffect(() => {
		const erfSelected = erfs?.find(erf => erf.erfNo === erfSearch);
		// console.log(`erfSelected`, erfSelected);
		setSelectedErf(erfSelected);
	}, [erfSearch]);

	useEffect(() => {
		if (selectedErf) {
			const lat = selectedErf?.address?.gps?.latitude;
			const lng = selectedErf?.address?.gps?.longitude;
			// console.log(`mapRef`, mapRef);
			// console.log(`zoom`, zoom);
			mapRef.current?.panTo({ lat, lng });
			mapRef.current?.setZoom(20);
		}
	}, [selectedErf]);

	const selectErf = e => {
		// console.log(`e.target?.innerHTML`, e.target?.innerHTML);
		setErfSearch(e.target?.innerHTML);
		// setErfSearch("");
	};

	const onMapLoad = mapObjects => {
		// console.log(`myMapObjects`, mapObjects);
		const { map } = mapObjects;
		// console.log(`mapRef`, mapRef);
		mapRef.current = map;
		// console.log(`mapRef`, mapRef);
		// console.log(`clusters`, clusters);
		mapRef.current?.data?.loadGeoJson(edumbe);
		mapRef.current?.data?.setStyle({
			fillOpacity: 0.0,
		});
		// mapRef.data.addListener("click", handleErfClick);
	};

	// this will fire everytime there is a click on the marker
	const handleMarkerClick = (id, lat, lng) => {
		mapRef.current?.panTo({ lat, lng });

		// get erf data using erf id
		const erf = erfs.find(erf => erf.id === id);
		// console.log(`erf`, erf);

		if (erf) {
			openModal({
				modalName: "tabsErfMapInfoWrapper",
				payload: erf,
			});
		}
	};

	return (
		<div className="tabs-erfs-map">
			<div className="search-box">
				<input
					className="erf-search"
					type="text"
					placeholder=" enter erf no"
					onChange={e => setErfSearch(e.target.value)}
					value={erfSearch}
				/>
				<div className={`search-dropdown ${hideShow} `}>
					{filteredErfs &&
						filteredErfs?.map(erf => {
							// console.log(`erf`, erf);
							return (
								<p key={erf.id} onClick={selectErf}>
									{erf.erfNo}
								</p>
							);
						})}
				</div>
			</div>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
				defaultCenter={{ lat: -27.422497628330788, lng: 30.81734906312119 }}
				defaultZoom={13}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded={onMapLoad}
				onChange={({ zoom, bounds }) => {
					setZoom(zoom);
					setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]);
				}}
			>
				{clusters.map(cluster => {
					// console.log(`cluster?.properties?.erf`, cluster?.properties?.erf);
					const [longitude, latitude] = cluster.geometry.coordinates;
					const { cluster: isCluster, point_count: pointCount } = cluster.properties;
					const erfNo = cluster?.properties?.erf?.erfNo;
					const id = cluster?.properties?.erf?.id;

					if (isCluster) {
						return (
							<Marker key={`${cluster.id}`} lat={latitude} lng={longitude}>
								<div
									className="cluster-marker"
									style={{
										width: `${10 + (pointCount / points.length) * 20}px`,
										height: `${10 + (pointCount / points.length) * 20}px`,
									}}
									onClick={() => {
										const expansionZoom = Math.min(
											supercluster.getClusterExpansionZoom(cluster.id),
											20
										);
										mapRef.current.setZoom(expansionZoom);
										mapRef.current.panTo({ lat: latitude, lng: longitude });
									}}
								>
									{pointCount}
								</div>
							</Marker>
						);
					}

					return (
						<Marker
							key={`${cluster.properties.erfId}`}
							lat={latitude}
							lng={longitude}
						>
							<button
								className="erf-marker"
								onClick={() => handleMarkerClick(id, latitude, longitude)}
							>
								<span className="erf-no">{erfNo}</span>
							</button>
						</Marker>
					);
				})}
			</GoogleMapReact>
		</div>
	);
}
