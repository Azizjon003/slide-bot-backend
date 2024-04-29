export const searchImages = async (query: string, i: number = 3) => {
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
  console.log(response);

  let images = response?.images[i]?.display_sizes[0]?.uri;

  if (!images) {
    let data = await fetch(
      `https://unsplash.com/ngetty/v3/search/images/creative?exclude_editorial_use_only=true&exclude_nudity=true&fields=display_set%2Creferral_destinations%2Ctitle&graphical_styles=photography&page_size=28&phrase=nature&sort_order=best_match`,
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

export const getImagesNewSearch = async (query: string, limit = 0) => {
  const data = await fetch(
    `https://unsplash.com/napi/search/photos?orientation=landscape&page=1&per_page=20&query=${query}&xp=semantic-search%3Acontrol`,
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
          "require_cookie_consent=false; xp-semantic-search=control; uuid=405cb930-e535-11ee-bca3-7372f8ac6205; azk=405cb930-e535-11ee-bca3-7372f8ac6205; xp-better-load-more=plus-affiliates; azk-ss=true; _sp_ses.0295=*; _sp_id.0295=14635c6f-3bdd-48ce-93d9-8f4ca9911b81.1710772737.3.1714365071.1714240851.b4d33acc-edae-47c1-8d97-5a22d0fbc9ec.dff97392-ad57-4c0c-b23d-2d111830a232.a8ff887a-9271-4183-9fa0-579918dce73a.1714364081666.184",
        Referer:
          "https://unsplash.com/s/photos/cyber-security?orientation=landscape",
        "Referrer-Policy": "origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  );

  let datas = await data.json();
  let total = datas.total;
  if (datas.total === 0) {
    const resDatas = await fetch(
      `https://unsplash.com/napi/search/photos?orientation=landscape&page=1&per_page=20&query=Nature&xp=semantic-search%3Acontrol`,
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
            "require_cookie_consent=false; xp-semantic-search=control; uuid=405cb930-e535-11ee-bca3-7372f8ac6205; azk=405cb930-e535-11ee-bca3-7372f8ac6205; xp-better-load-more=plus-affiliates; azk-ss=true; _sp_ses.0295=*; _sp_id.0295=14635c6f-3bdd-48ce-93d9-8f4ca9911b81.1710772737.3.1714365071.1714240851.b4d33acc-edae-47c1-8d97-5a22d0fbc9ec.dff97392-ad57-4c0c-b23d-2d111830a232.a8ff887a-9271-4183-9fa0-579918dce73a.1714364081666.184",
          Referer:
            "https://unsplash.com/s/photos/cyber-security?orientation=landscape",
          "Referrer-Policy": "origin-when-cross-origin",
        },
        body: null,
        method: "GET",
      }
    );

    datas = await datas.json();
  }
  datas = datas?.results.map((image: any) => {
    let urls = `${
      image?.urls?.raw.split("\\u0")[0]
    }&q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3`;

    return urls;
  });

  return datas[total === 0 ? 0 : limit];
};

export const getImagesNewPixels = async (query: string, limit = 0) => {
  const datas = await fetch(
    `https://www.pexels.com/en-us/api/v3/search/photos?page=1&per_page=24&query=${query}&orientation=all&size=all&color=all&sort=popular&seo_tags=true`,
    {
      headers: {
        authorization: "",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "secret-key": "H2jk9uKnhRmL6WPwh89zBezWvr",
        "x-client-type": "react",
        "x-forwarded-cf-connecting-ip": "",
        "x-forwarded-cf-ipregioncode": "",
        "x-forwarded-http_cf_ipcountry": "",
        Referer: "https://www.pexels.com/search/Alisher%20Navoiy/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  );
  let data = await datas.json();

  let totalResults = data?.pagination?.total_results;

  console.log(totalResults);
  if (totalResults === 0) {
    const dts = await fetch(
      `https://www.pexels.com/en-us/api/v3/search/photos?page=1&per_page=24&query=Nature&orientation=all&size=all&color=all&sort=popular&seo_tags=true`,
      {
        headers: {
          authorization: "",
          "content-type": "application/json",
          "sec-ch-ua":
            '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Linux"',
          "secret-key": "H2jk9uKnhRmL6WPwh89zBezWvr",
          "x-client-type": "react",
          "x-forwarded-cf-connecting-ip": "",
          "x-forwarded-cf-ipregioncode": "",
          "x-forwarded-http_cf_ipcountry": "",
          Referer: "https://www.pexels.com/search/Alisher%20Navoiy/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: null,
        method: "GET",
      }
    );
    data = await dts.json();
  }
  console.log(data);
  let images = data.data.map((item: any) => {
    return item?.attributes?.image?.medium;
  });

  return images[limit];
};
// getImagesNewPixels("Erali");
