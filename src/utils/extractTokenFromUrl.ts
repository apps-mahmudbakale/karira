function extractTokenFromUrl(url: string): string | null {
  const urlObject = new URL(url);
  const searchParams = urlObject.searchParams;

  // Check if the 'token' parameter exists
  if (!searchParams.has("token")) {
    return null; 
  }

  return searchParams.get("token"); 
}

export default extractTokenFromUrl;
