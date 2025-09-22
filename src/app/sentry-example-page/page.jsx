"use client";

import Head from "next/head";
import * as Sentry from "@sentry/nextjs";
import { useState, useEffect } from "react";

class SentryExampleFrontendError extends Error {
  constructor(message = "Frontend error occurred") {
    super(message);
    this.name = "SentryExampleFrontendError";
  }
}

export default function Page() {
  const [hasSentError, setHasSentError] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [hasCheckedConnectivity, setHasCheckedConnectivity] = useState(false);

  useEffect(() => {
    async function checkConnectivity() {
      try {
        const result = await Sentry.diagnoseSdkConnectivity();
        setIsConnected(result !== "sentry-unreachable");
      } catch (error) {
        console.error("Failed to check Sentry connectivity:", error);
        setIsConnected(false);
      } finally {
        setHasCheckedConnectivity(true);
      }
    }
    checkConnectivity();
  }, []);

  // Render placeholder during initial hydration
  if (!hasCheckedConnectivity) {
    return (
      <div>
        <Head>
          <title>sentry-example-page</title>
          <meta name="description" content="Test Sentry for your Next.js app!" />
        </Head>

        <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 font-sans">
          <div className="flex-1" />

          <svg height="40" width="40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-current">
            <path
              d="M21.85 2.995a3.698 3.698 0 0 1 1.353 1.354l16.303 28.278a3.703 3.703 0 0 1-1.354 5.053 3.694 3.694 0 0 1-1.848.496h-3.828a31.149 31.149 0 0 0 0-3.09h3.815a.61.61 0 0 0 .537-.917L20.523 5.893a.61.61 0 0 0-1.057 0l-3.739 6.494a28.948 28.948 0 0 1 9.63 10.453 28.988 28.988 0 0 1 3.499 13.78v1.542h-9.852v-1.544a19.106 19.106 0 0 0-2.182-8.85 19.08 19.08 0 0 0-6.032-6.829l-1.85 3.208a15.377 15.377 0 0 1 6.382 12.484v1.542H3.696A3.694 3.694 0 0 1 0 34.473c0-.648.17-1.286.494-1.849l2.33-4.074a8.562 8.562 0 0 1 2.689 1.536L3.158 34.17a.611.611 0 0 0 .538.917h8.448a12.481 12.481 0 0 0-6.037-9.09l-1.344-.772 4.908-8.545 1.344.77a22.16 22.16 0 0 1 7.705 7.444 22.193 22.193 0 0 1 3.316 10.193h3.699a25.892 25.892 0 0 0-3.811-12.033 25.856 25.856 0 0 0-9.046-8.796l-1.344-.772 5.269-9.136a3.698 3.698 0 0 1 3.2-1.849c.648 0 1.285.17 1.847.495Z"
              fill="currentcolor"
            />
          </svg>

          <h1 className="rounded bg-gray-50 px-1 py-0 font-mono text-xl leading-tight dark:bg-gray-800">sentry-example-page</h1>

          <p className="max-w-lg text-center text-xl leading-relaxed text-gray-600 dark:text-gray-400">
            Click the button below, and view the sample error on the Sentry{" "}
            <a target="_blank" href="https://liburduluid.sentry.io/issues/?project=4509427953631232" className="text-purple-600 underline cursor-pointer hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
              Issues Page
            </a>
            . For more details about setting up Sentry,{" "}
            <a target="_blank" href="https://docs.sentry.io/platforms/javascript/guides/nextjs/" className="text-purple-600 underline cursor-pointer hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
              read our docs
            </a>
            .
          </p>

          <button
            type="button"
            className="group mt-1 rounded-lg border-none bg-purple-800 p-0 text-white cursor-pointer"
            onClick={async () => {
              try {
                await Sentry.startSpan(
                  {
                    name: "Example Frontend Span",
                    op: "test",
                  },
                  async () => {
                    const res = await fetch("/api/sentry-example-api");
                    if (!res.ok) {
                      setHasSentError(true);
                      throw new SentryExampleFrontendError("This error is raised on the frontend of the example page.");
                    }
                  }
                );
              } catch (error) {
                setHasSentError(true);
                throw error;
              }
            }}
          >
            <span className="inline-block transform rounded-lg border border-purple-800 bg-purple-500 px-4 py-3 text-xl font-bold leading-none transition-transform -translate-y-1 group-hover:-translate-y-2 group-active:translate-y-0">
              Throw Sample Error
            </span>
          </button>

          <div className="h-12" />

          <div className="flex-1" />

          <p className="text-xl text-gray-600 dark:text-gray-400">Loading connectivity status...</p>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>sentry-example-page</title>
        <meta name="description" content="Test Sentry for your Next.js app!" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 font-sans">
        <div className="flex-1" />

        <svg height="40" width="40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-current">
          <path
            d="M21.85 2.995a3.698 3.698 0 0 1 1.353 1.354l16.303 28.278a3.703 3.703 0 0 1-1.354 5.053 3.694 3.694 0 0 1-1.848.496h-3.828a31.149 31.149 0 0 0 0-3.09h3.815a.61.61 0 0 0 .537-.917L20.523 5.893a.61.61 0 0 0-1.057 0l-3.739 6.494a28.948 28.948 0 0 1 9.63 10.453 28.988 28.988 0 0 1 3.499 13.78v1.542h-9.852v-1.544a19.106 19.106 0 0 0-2.182-8.85 19.08 19.08 0 0 0-6.032-6.829l-1.85 3.208a15.377 15.377 0 0 1 6.382 12.484v1.542H3.696A3.694 3.694 0 0 1 0 34.473c0-.648.17-1.286.494-1.849l2.33-4.074a8.562 8.562 0 0 1 2.689 1.536L3.158 34.17a.611.611 0 0 0 .538.917h8.448a12.481 12.481 0 0 0-6.037-9.09l-1.344-.772 4.908-8.545 1.344.77a22.16 22.16 0 0 1 7.705 7.444 22.193 22.193 0 0 1 3.316 10.193h3.699a25.892 25.892 0 0 0-3.811-12.033 25.856 25.856 0 0 0-9.046-8.796l-1.344-.772 5.269-9.136a3.698 3.698 0 0 1 3.2-1.849c.648 0 1.285.17 1.847.495Z"
            fill="currentcolor"
          />
        </svg>

        <h1 className="rounded bg-gray-50 px-1 py-0 font-mono text-xl leading-tight dark:bg-gray-800">sentry-example-page</h1>

        <p className="max-w-lg text-center text-xl leading-relaxed text-gray-600 dark:text-gray-400">
          Click the button below, and view the sample error on the Sentry{" "}
          <a target="_blank" href="https://liburduluid.sentry.io/issues/?project=4509427953631232" className="text-purple-600 underline cursor-pointer hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
            Issues Page
          </a>
          . For more details about setting up Sentry,{" "}
          <a target="_blank" href="https://docs.sentry.io/platforms/javascript/guides/nextjs/" className="text-purple-600 underline cursor-pointer hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
            read our docs
          </a>
          .
        </p>

        <button
          type="button"
          className="group mt-1 rounded-lg border-none bg-purple-800 p-0 text-white cursor-pointer"
          onClick={async () => {
            try {
              await Sentry.startSpan(
                {
                  name: "Example Frontend Span",
                  op: "test",
                },
                async () => {
                  const res = await fetch("/api/sentry-example-api");
                  if (!res.ok) {
                    setHasSentError(true);
                    throw new SentryExampleFrontendError("This error is raised on the frontend of the example page.");
                  }
                }
              );
            } catch (error) {
              setHasSentError(true);
              throw error;
            }
          }}
        >
          <span className="inline-block transform rounded-lg border border-purple-800 bg-purple-500 px-4 py-3 text-xl font-bold leading-none transition-transform -translate-y-1 group-hover:-translate-y-2 group-active:translate-y-0">
            Throw Sample Error
          </span>
        </button>

        {hasSentError ? (
          <div className="rounded-lg border border-green-600 bg-green-400 px-4 py-3 text-xl leading-none text-gray-900">Sample error was sent to Sentry.</div>
        ) : !isConnected ? (
          <div className="w-full max-w-lg rounded-lg border border-red-600 bg-red-500 px-4 py-3 text-center text-white">
            <p className="m-0">
              The Sentry SDK is not able to reach Sentry right now - this may be due to an adblocker. For more information, see{" "}
              <a target="_blank" href="https://docs.sentry.io/platforms/javascript/guides/nextjs/troubleshooting/#the-sdk-is-not-sending-any-data" className="text-white underline">
                the troubleshooting guide
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="h-12" />
        )}

        <div className="flex-1" />

        <p className="text-xl text-gray-600 dark:text-gray-400">Adblockers will prevent errors from being sent to Sentry.</p>
      </main>
    </div>
  );
}
