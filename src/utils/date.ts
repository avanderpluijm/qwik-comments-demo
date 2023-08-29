import { $ } from "@builder.io/qwik";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const fromNow = $((d: Date) => dayjs(d).fromNow());
