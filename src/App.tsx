import React, { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react"; // Import Lucide icons
import CustomerCard from "../../asg1/src/components/card";
import CustomerDetails from "../../asg1/src/components/info";
import { fetchCustomers } from "../../asg1/src/services/customer";
import { Customer } from "../../asg1/src/types/customer";
import "./scroll.css";

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [displayedCustomers, setDisplayedCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Flag to check if more data is available
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar open state
  const limit = 10;

  const customerListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCustomers = async () => {
      setLoading(true);
      try {
        const customerData = await fetchCustomers();
        setCustomers(customerData);
        setDisplayedCustomers(customerData.slice(0, limit));
        if (customerData.length > 0) {
          setSelectedCustomer(customerData[0]);
        }
        setHasMore(customerData.length > limit); // Check if more data is available
      } finally {
        setLoading(false);
      }
    };
    loadCustomers();
  }, []);

  const loadMoreCustomers = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const newOffset = offset + limit;
    const nextCustomers = customers.slice(newOffset, newOffset + limit);

    if (nextCustomers.length > 0) {
      setDisplayedCustomers((prev) => [...prev, ...nextCustomers]);
      setOffset(newOffset);
    } else {
      setHasMore(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!customerListRef.current) return;

      const scrollableHeight = customerListRef.current.scrollHeight;
      const scrollPosition =
        customerListRef.current.scrollTop +
        customerListRef.current.clientHeight;

      if (scrollPosition >= scrollableHeight - 200) {
        loadMoreCustomers();
      }
    };

    const refCurrent = customerListRef.current;
    refCurrent?.addEventListener("scroll", handleScroll);
    return () => refCurrent?.removeEventListener("scroll", handleScroll);
  }, [offset, loading, hasMore]);

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar Toggle Button */}
      <button
        className="fixed top-4 left-4 z-10 p-2 bg-gray-800 text-white rounded-md md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 lg:w-1/3 w-full p-2 overflow-y-auto scrollbar-thin`}
        ref={customerListRef}
      >
        {displayedCustomers.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            isSelected={selectedCustomer?.id === customer.id}
            onSelect={() => {
              setIsSidebarOpen(false);
              setSelectedCustomer(customer);
            }}
          />
        ))}
        {loading && <div className="text-center p-4">Loading...</div>}
        {!hasMore && !loading && (
          <div className="text-center p-4">No more customers to load</div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-2">
        {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
      </div>
    </div>
  );
};

export default App;
