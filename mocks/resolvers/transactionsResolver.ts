import { ResolverType } from './resolverType';
import mockedTransactions from '../mockedTransactions.json';


const transactionsResolver: ResolverType = (req, res, ctx) => {
  const walletAddress = req.url.searchParams.get('address');
  if (walletAddress === '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd') {
    return res(
        ctx.status(200),
        ctx.json({
          status: 0,
          message: 'No transactions found',
          result: [],
        }),
    );
  };
  return res(
      ctx.status(200),
      ctx.json({
        status: 1,
        message: 'OK',
        result: mockedTransactions,
      }),
  );
};

export default transactionsResolver;
