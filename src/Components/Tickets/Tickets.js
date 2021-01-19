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

  const handleChange = (event, value) => {
    setPage(value);
  };

  const filteredTicket = useMemo(() => {
    return tickets[page - 1] || [];
  }, [tickets, page]);


  const getData = useCallback(async () => {
    try {
      const res = await fetch('https://front-test.beta.aviasales.ru/search').then(data => data.json())
      const result = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${res.searchId}`);
      const ticket = await result.json();
      console.log(ticket)
      setTickets(chunk(ticket.tickets, 10));
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
    {filteredTicket.map(item => <Ticket item={item}/>
  )}
    <Pagination count={tickets.length} page={page} onChange={handleChange} />
  </>
  );
}