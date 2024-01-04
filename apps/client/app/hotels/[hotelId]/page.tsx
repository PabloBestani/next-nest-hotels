import React from "react";

export default function HotelDetail({
  params,
}: {
  params: { hotelId: string };
}) {
  return <div>HotelDetail for id {params.hotelId}</div>;
}
