// import { useRouter } from "next/router";
import { NextResponse } from "next/server";
import { getRole } from "./components/utils";
import { apibasePath } from "./config";

export default function middleware(req) {
  // let temp;
  // if (typeof window !== "undefined") {
  //   temp = localStorage.getItem("role");
  //   console.log(localStorage.getItem("role"));
  // }
  // console.log(temp);
  // const adminRole = "user";
  const role = getRole()
  // const corporateRole = "corporate1";
  const url = req.url;

  // if (
  //   (adminRole == "admin" && req.nextUrl.pathname.startsWith("/admin")) ||
  //   req.nextUrl.pathname.startsWith("/")
  // ) {
  //   return NextResponse.redirect(`http://localhost:3000/login`);
  // }
  // if (role !== "user" && req.nextUrl.pathname.startsWith("/corporate") || req.nextUrl.pathname.startsWith("/")) {
  //   return NextResponse.redirect(`http://localhost:3000/login`);
  // }
}

export const config = {
  matcher: ["/admin/:path*", "/corporate/:path*"],
};
