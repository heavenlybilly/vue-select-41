export const errorLog = (params: { module?: string; message: string }) => {
  const module = params.module ? ` (${params.module})` : ''
  console.error(`Vue Select${module} error: ${params.message}`)
}
