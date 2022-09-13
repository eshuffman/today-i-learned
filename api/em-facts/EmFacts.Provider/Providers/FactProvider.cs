using EmFacts.Data.Interfaces;
using EmFacts.Data.Model;
using EmFacts.Provider.Interfaces;
using EmFacts.Utilities.HttpResponseExceptions;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmFacts.Provider.Providers
{
    /// <summary>
    /// This class provides the implementation of the IPromoCodeProvider interface, providing service methods for promo codes.
    /// </summary>
    public class FactProvider : IFactProvider
    {
        private readonly ILogger<FactProvider> _logger;
        private readonly IFactRepository _factRepository;

        public FactProvider(IFactRepository factRepository, ILogger<FactProvider> logger)
        {
            _logger = logger;
            _factRepository = factRepository;
        }

        /// <summary>
        /// Persists a promo code to the database.
        /// </summary>
        /// <param name="model">PromoCodeDTO used to build the promo code.</param>
        /// <returns>The persisted promo code with IDs.</returns>
        public async Task<Fact> CreateFactAsync(Fact newFact)
        {
      
            Fact savedFact;

           
            try
            {
                savedFact = await _factRepository.CreateFactAsync(newFact);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }


            return savedFact;
        }

        public async Task<IEnumerable<Fact>> GetAllFactsAsync()
        {
            IEnumerable<Fact> facts;

            try
            {
                facts = await _factRepository.GetAllFactsAsync();
            }
            catch (BadRequestException ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }

            return facts;
        }

        public async Task<Fact> GetFactByIdAsync(int Id)
        {
            Fact fact;

            try
            {
                fact = await _factRepository.GetFactByIdAsync(Id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }

            if (fact == null || fact == default)
            {
                _logger.LogInformation($"Fact with id of {Id} could not be found.");
                throw new NotFoundException($"Fact with id of {Id} could not be found.");
            }

            return fact;
        }

        public async Task<Fact> DeleteFactByIdAsync(int Id)
        {
            var fact = await _factRepository.DeleteFactByIdAsync(Id);
            if (fact == null || fact == default)
            {
                _logger.LogInformation($"Fact with id: {Id} could not be found.");
                throw new NotFoundException($"Fact with id: {Id} could not be found.");
            }
            return fact;
        }
    }

}