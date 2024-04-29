export const searchImages = async (query: string, i: number = 2) => {
  console.log(query, "query");
  let data = await fetch(
    `https://unsplash.com/ngetty/v3/search/images/creative?exclude_editorial_use_only=true&exclude_nudity=true&fields=display_set%2Creferral_destinations%2Ctitle&graphical_styles=photography&page_size=28&phrase=${query}&sort_order=best_match`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US",
        "sec-ch-ua":
          '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        cookie:
          "require_cookie_consent=false; xp-semantic-search=control; _sp_ses.0295=*; uuid=405cb930-e535-11ee-bca3-7372f8ac6205; azk=405cb930-e535-11ee-bca3-7372f8ac6205; _sp_id.0295=14635c6f-3bdd-48ce-93d9-8f4ca9911b81.1710772737.1.1710774481..90bbdb32-9421-4541-b98c-b22989f324e2..ad41ea7b-6801-4cde-8877-eac584129d08.1710772737685.53",
        Referer: "https://unsplash.com/s/photos/zoroastrianism",
        "Referrer-Policy": "origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  );

  const response = await data.json();
  console.log(response?.images[i]);

  let images = response?.images[i]?.display_sizes[0]?.uri;

  if (!images) {
    let data = await fetch(
      `https://unsplash.com/ngetty/v3/search/images/creative?exclude_editorial_use_only=true&exclude_nudity=true&fields=display_set%2Creferral_destinations%2Ctitle&graphical_styles=photography&page_size=28&phrase=cyber_security&sort_order=best_match`,
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US",
          "sec-ch-ua":
            '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Linux"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          cookie:
            "require_cookie_consent=false; xp-semantic-search=control; _sp_ses.0295=*; uuid=405cb930-e535-11ee-bca3-7372f8ac6205; azk=405cb930-e535-11ee-bca3-7372f8ac6205; _sp_id.0295=14635c6f-3bdd-48ce-93d9-8f4ca9911b81.1710772737.1.1710774481..90bbdb32-9421-4541-b98c-b22989f324e2..ad41ea7b-6801-4cde-8877-eac584129d08.1710772737685.53",
          Referer: "https://unsplash.com/s/photos/zoroastrianism",
          "Referrer-Policy": "origin-when-cross-origin",
        },
        body: null,
        method: "GET",
      }
    );
    const response = await data.json();
    images = response?.images[i]?.display_sizes[0]?.uri;
  }

  return images;
};

export const getImages = async (query: string, limit = 5) => {
  let data = await fetch(
    `https://unsplash.com/ngetty/v3/search/images/creative?exclude_editorial_use_only=true&exclude_nudity=true&fields=display_set%2Creferral_destinations%2Ctitle&graphical_styles=photography&page_size=28&phrase=${query}&sort_order=best_match`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US",
        "sec-ch-ua":
          '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        cookie:
          "require_cookie_consent=false; xp-semantic-search=control; _sp_ses.0295=*; uuid=405cb930-e535-11ee-bca3-7372f8ac6205; azk=405cb930-e535-11ee-bca3-7372f8ac6205; _sp_id.0295=14635c6f-3bdd-48ce-93d9-8f4ca9911b81.1710772737.1.1710774481..90bbdb32-9421-4541-b98c-b22989f324e2..ad41ea7b-6801-4cde-8877-eac584129d08.1710772737685.53",
        Referer: "https://unsplash.com/s/photos/zoroastrianism",
        "Referrer-Policy": "origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  );

  const response = await data.json();
  console.log(response);
  let images = response?.images.map((image: any) => {
    return image?.display_sizes[0]?.uri;
  });

  images = images.slice(0, limit);

  return images;
};

searchImages("cyber_security");
