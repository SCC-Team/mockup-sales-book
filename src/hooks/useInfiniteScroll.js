import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useInfiniteScroll(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [items, setItems] = useState([])
  const [hasMore, setHasMore] = useState(false)


  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: {q: "angel", page: pageNumber },
      cancelToken: new axios.CancelToken((c) => cancel = c)
    }).then((res) => {
      setItems(prevItems => {
        return [...new Set([...prevItems, ...res.data.docs] )]
      })
      console.log(res.data.docs)
      setHasMore(res.data.docs.length > 0)
      setLoading(false)
    }).catch((e) => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [ pageNumber])

  return { loading, error, items, hasMore }
}