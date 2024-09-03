import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PrimaryBtn from 'components/buttons/primary';
import { getAllAccounts } from 'api/accounts';
import { useSelector } from 'react-redux';
import AccountCard from 'components/cards/accounts';
import AccountCardSkeleton from 'components/cards/accounts/skeleton';

function Accounts() {
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const { _id } = useSelector((store) => store.user.userData);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getAllAccounts(_id);
        setAccounts(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, [_id]);

  return (
    <div className="min-h-[90vh] flex flex-col py-6 px-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-[25px] font-bold">Accounts</h2>
        <PrimaryBtn label="Create +" link="/accounts/create" customCss="py-[3px] px-2" />
      </div>

      { isLoading ? (
        <div className="grid sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 py-5 gap-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="col-span-3">
              <AccountCardSkeleton />
            </div>
          ))}
        </div>
      ) : accounts.length > 0 ? (
        <div className="grid sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 py-5 gap-3">
          {accounts.map((account) => (
            <div key={account.name} className="col-span-3">
              <AccountCard {...account} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col flex-grow justify-center items-center">
          <p className="font-medium text-lg">No Account Found!</p>
          <Link to="/accounts/create" className="mt-1 text-blue-800 font-medium hover:text-blue-900 underline">
            Create Now
          </Link>
        </div>
      )}
    </div>
  );
}

export default Accounts;