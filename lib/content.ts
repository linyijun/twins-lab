export type Person = { name: string; role: string; institute: string; photo: string; link?: string };
export type Project = { title: string; image: string; links: { label: string; href: string }[]; body: string };

export function sections(markdown: string) {
  return markdown.trim().split(/^# /m).filter(Boolean).map((chunk) => {
    const [title, ...rest] = chunk.trim().split("\n");
    return { title, body: rest.join("\n").trim() };
  });
}

export function entries(markdown: string) {
  return markdown.trim().split(/^## /m).slice(1).map((chunk) => {
    const [title, ...lines] = chunk.trim().split("\n");
    const fields: Record<string, string> = {};
    const body: string[] = [];
    lines.forEach((line) => {
      const match = line.match(/^([a-z]+):\s*(.*)$/);
      if (match) fields[match[1]] = match[2]; else body.push(line);
    });
    return { title, fields, body: body.join("\n").trim() };
  });
}
