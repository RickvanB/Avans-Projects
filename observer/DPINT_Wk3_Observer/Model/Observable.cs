using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DPINT_Wk3_Observer.Model
{
    public abstract class Observable<T> : IObservable<T>, IDisposable
    {

        // Aan hen moeten we een seintje geven als we veranderd zijn.
        private List<IObserver<T>> _observers;
        public Observable()
        {
            _observers = new List<IObserver<T>>();
        }
        /// <summary>
        /// Deze private class gebruiken we om terug te geven bij de Subscribe methode.
        /// </summary>
        private struct Unsubscriber : IDisposable
        {
            private Action _unsubscribe;
            public Unsubscriber(Action unsubscribe) { _unsubscribe = unsubscribe; }
            public void Dispose() { _unsubscribe(); }
        }


        public IDisposable Subscribe(IObserver<T> observer)
        {
            // TODO: We moeten bijhouden wie ons in de gaten houdt.
            // TODO: Stop de observer dus in de lijst met observers. We weten dan
            // welke objecten we allemaal een seintje moeten geven.
            // Daarna geven we een object terug.
            // Als dat object gedisposed wordt geven wij
            // de bovenstaande observer geen seintjes meer.
            this._observers.Add(observer);
            return new Unsubscriber(() => _observers.Remove(observer));
        }

        /// <summary>
        /// Deze methode kunnen we aanroepen vanuit onze subklasses.
        /// Hier geven we dan een seintje aan al onze observers dat we veranderd zijn.
        /// </summary>
        /// <param name="subject">Dat is de "this" van onze subklasses</param>
        protected void Notify(T subject)
        {
            // TODO: Hier moeten we iedere observer die ons in de gaten houdt een seintje geven dat we een nieuwe waarde hebben.We roepen dus hun OnNext methode aan.
            foreach(var observer in  _observers)
            {
                observer.OnNext(subject);
            }
        }

        public void Dispose()
        {
            // Deze implementeren we later
            throw new NotImplementedException();
        }

    }
}
