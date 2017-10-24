const url = `${process.env.REACT_APP_BACKEND}/categories`;
console.log('fetching from url', url);

export function fetchCategories () {

  return fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
    .then((res) => res.json())
    .then(({ data }) => data.map(({ category }) => category))
}

