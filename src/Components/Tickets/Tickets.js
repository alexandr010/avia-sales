import { useEffect, useState, useCallback, useMemo } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import Ticket from './Ticket/Ticket';


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );


export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [transfer, setTransfer] = useState([]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const filteredTicket = useMemo(() => {
    const filtered = tickets.filter((item) => {
      if(transfer.length > 0){
        return transfer.includes(item.segments[0].stops.length);
      }
      return item;
    })
    return chunk(filtered, 10);
  }, [tickets, transfer]);
  
  

  const getData = useCallback(async () => {
    try {
      const res = await fetch('https://front-test.beta.aviasales.ru/search').then(data => data.json())
      const result = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${res.searchId}`);
      const ticket = await result.json();
      console.log(ticket)
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

    {(filteredTicket[page - 1] || []).map(item => <Ticket item={item}/>
  )}
    <Pagination count={filteredTicket.length} page={page} onChange={handleChange} />
  </>
  );
}