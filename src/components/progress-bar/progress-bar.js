"use client";

import NProgress from "nprogress";
import { Suspense, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "src/routes/hooks";
import StyledProgressBar from "./styles";

export default function ProgressBar() {
  const pathname = usePathname();

  if (pathname.startsWith("/hotels")) {
    return null;
  }

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleAnchorClick = (event) => {
      const targetUrl = event.currentTarget.href;
      const currentUrl = window.location.href;

      if (targetUrl !== currentUrl && !targetUrl.startsWith("/hotels")) {
        NProgress.start();
      }
    };

    const handleMutation = () => {
      const anchorElements = document.querySelectorAll("a[href]");

      const filteredAnchors = Array.from(anchorElements).filter((element) => {
        const href = element.getAttribute("href");
        return href && href.startsWith("/");
      });

      filteredAnchors.forEach((anchor) => anchor.addEventListener("click", handleAnchorClick));
    };

    const mutationObserver = new MutationObserver(handleMutation);

    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray) => {
        if (!window.location.pathname.startsWith("/hotels")) {
          NProgress.done();
        }
        return target.apply(thisArg, argArray);
      },
    });

    return () => {
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <StyledProgressBar />

      <Suspense fallback={null}>
        <NProgressDone />
      </Suspense>
    </>
  );
}

function NProgressDone() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname.startsWith("/hotels")) {
      NProgress.done();
    }
  }, [pathname, router, searchParams]);

  return null;
}
