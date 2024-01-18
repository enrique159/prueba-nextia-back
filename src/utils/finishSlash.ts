const finish = (string: string, end: string) => string.endsWith(end) ? string : `${string}${end}`

export default function finishSlash(string: string) {
  return finish(string, '/')
}