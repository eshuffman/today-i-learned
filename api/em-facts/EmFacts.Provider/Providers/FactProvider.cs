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
    /// This class provides the implementation of the IFactProvider interface, providing service methods for facts.
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
        /// Persists a fact to the database.
        /// </summary>
        /// <param name="model">FactDTO used to build the fact.</param>
        /// <returns>The persisted fact with ID.</returns>
        public async Task<Fact> CreateFactAsync(Fact newFact)
        {
      
            Fact savedFact;

            ValidateFactInputFields(newFact);

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

        public async Task<IEnumerable<Fact>> GetFactsByDateAsync(DateTime date)
        {
            IEnumerable<Fact> facts;

            try
            {
                facts = await _factRepository.GetFactsByDateAsync(date);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }

            //maybe throw in a check if there aren't any returned facts

            return facts;
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

        public async Task<Fact> UpdateFactAsync(int id, Fact updatedFact)
        {
            Fact existingFact;


            try
            {
                existingFact = await _factRepository.GetFactByIdAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }

            if (existingFact == default)
            {
                _logger.LogInformation($"Fact with id of {id} does not exist.");
                throw new NotFoundException($"Fact with id of {id} not found.");
            }

            if (existingFact.Id != updatedFact.Id)
            {
                if (updatedFact.Id == default)
                {
                    updatedFact.Id = existingFact.Id;
                }
                else throw new BadRequestException("Fact ID cannot be changed.");
            }

            ValidateFactInputFields(updatedFact);

            try
            {
                await _factRepository.UpdateFactAsync(updatedFact);
                _logger.LogInformation("Fact updated.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new ServiceUnavailableException("There was a problem connecting to the database.");
            }

            return updatedFact;
        }

        //Validation Methods

        public void ValidateFactInputFields(Fact fact)
        {
            List<string> factExceptions = new();

            if (ValidateIfEmptyOrNull(fact.Question))
            {
                factExceptions.Add("Question is required.");
            }
            
            if (ValidateIfEmptyOrNull(fact.Tidbit))
            {
                factExceptions.Add("Tidbit is required.");
            }

            if (ValidateIfEmptyOrNull(fact.Tier.ToString()))
            {
                factExceptions.Add("Tier is required.");
            }

            if (factExceptions.Count > 0)
            {
                _logger.LogInformation(" ", factExceptions);
                throw new BadRequestException(string.Join(" ", factExceptions));
            }
        }

        public bool ValidateIfEmptyOrNull(string modelField)
        {
            return string.IsNullOrWhiteSpace(modelField);
        }

    }

}