interface GeocodeResult {
  country: string;
  formattedAddress: string;
}

export async function getCountryFromCoordinates(
  lat: number,
  lng: number
): Promise<GeocodeResult> {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      console.error("Google Maps API key is missing");
      return {
        country: "Unknown",
        formattedAddress: "Unknown location",
      };
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );

    if (!response.ok) {
      console.error("Geocoding API request failed:", response.statusText);
      return {
        country: "Unknown",
        formattedAddress: "Unknown location",
      };
    }

    const data = await response.json();

    // Check if API returned an error
    if (data.status !== "OK") {
      console.error("Geocoding API error:", data.status, data.error_message);
      return {
        country: "Unknown",
        formattedAddress: "Unknown location",
      };
    }

    // Check if results exist
    if (!data.results || data.results.length === 0) {
      console.error("No geocoding results found");
      return {
        country: "Unknown",
        formattedAddress: "Unknown location",
      };
    }

    const result = data.results[0];
    
    // Safely find country component
    const countryComponent = result.address_components?.find((component: any) =>
      component.types.includes("country")
    );

    return {
      country: countryComponent?.long_name || "Unknown",
      formattedAddress: result.formatted_address || "Unknown location",
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    return {
      country: "Unknown",
      formattedAddress: "Unknown location",
    };
  }
}