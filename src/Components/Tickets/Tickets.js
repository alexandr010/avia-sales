import { useEffect, useState, useCallback, useMemo } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import Ticket from './Ticket/Ticket';
import Filter from '../Filter/Filter';
import Main from '../Main/Main'
import {Grid} from '@material-ui/core';


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );


export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [transfer, setTransfer] = useState([]);
  const [sort, setSort] = useState();
  

  const handleChange = (event, value) => {
    setPage(value);
  };

  const filteredTicket = useMemo(() => {
    let filtered = tickets.filter((item) => {
      if (transfer.length > 0) {
        return transfer.includes(item.segments[0].stops.length);
      }
      return item;
    })

    if(sort === 'fast') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'cheap'){
      filtered.sort((a, b) => a.segments[0].duration - b.segments[0].duration);
    }
    
    
    
    const chunked = chunk(filtered, 10);
    return chunked;
  }, [tickets, transfer, sort]);

 console.log(tickets);
 

  const getData = useCallback(async () => {
    try {
      const res = await fetch('https://front-test.beta.aviasales.ru/search').then(data => data.json())
      const result = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${res.searchId}`);
      const ticket = await result.json();
      setTickets(ticket.tickets);
      setError(null)
    } catch (error) {
      setError(error);
    }

  }, [setTickets, setError]);


  useEffect(() => {
    getData();
  }, [getData]);

  if (error) {
    console.log(error)
  } else {
    console.log(filteredTicket);
  }

  return (<>
    <Grid container spasing={2}>
      <Grid item xs={4}>
        <Filter setTransfer={setTransfer} />
      </Grid>
      <Grid item xs={8}>
        <Grid container justify="center">
          <Main onClick={setSort} value={sort} />
          {(filteredTicket[page - 1] || []).map(item => <Ticket key={item.price} item={item} />
          )}
          <Pagination count={filteredTicket.length} page={page} onChange={handleChange} />
        </Grid>
      </Grid>
    </Grid>
  </>
  );
}