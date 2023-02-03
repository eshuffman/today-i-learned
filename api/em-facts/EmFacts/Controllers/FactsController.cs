using AutoMapper;
using EmFacts.Data.Model;
using EmFacts.DTOs;
using EmFacts.Provider.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmFacts.API.Controllers
{
    /// <summary>
    /// The Facts Controller exposes endpoints for fact-related actions.
    /// </summary>
    [ApiController]
    [Route("/facts")]
    public class FactsController : ControllerBase
    {
        private readonly ILogger<FactsController> _logger;
        private readonly IFactProvider _factProvider;
        private readonly IMapper _mapper;

        public FactsController(
            ILogger<FactsController> logger,
            IFactProvider factProvider,
            IMapper mapper
        )
        {
            _logger = logger;
            _factProvider = factProvider;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<FactsDTO>> CreateFactAsync([FromBody] Fact factToCreate)
        {
            _logger.LogInformation("Request received for CreateFactAsync");

            var fact = await _factProvider.CreateFactAsync(factToCreate);
            var factsDTO = _mapper.Map<FactsDTO>(fact);

            return Created("/facts", factsDTO);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FactsDTO>>> GetAllFactsAsync()
        {
            _logger.LogInformation("Request received for GetAllFactsAsync");

            var facts = await _factProvider.GetAllFactsAsync();
            var factDTOs = _mapper.Map<IEnumerable<FactsDTO>>(facts);

            return Ok(factDTOs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FactsDTO>> GetFactByIdAsync(int id)
        {
            _logger.LogInformation($"Request received for GetFactByIdAsync for id: {id}");

            var fact = await _factProvider.GetFactByIdAsync(id);
            var factDTO = _mapper.Map<FactsDTO>(fact);

            return Ok(factDTO);
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult<FactsDTO>> DeleteFactByIdAsync(int Id)
        {
            _logger.LogInformation("Request received for DeleteFactByIdAsync");
            try
            {
                var fact = await _factProvider.DeleteFactByIdAsync(Id);
                return NoContent();
            }
            catch (System.ArgumentNullException)
            {
                return NotFound($"No fact with ID: {Id} exists in the database");
            }

        }

        [HttpGet("review/{date}")]
        public async Task<ActionResult<IEnumerable<FactsDTO>>> GetFactsByDateAsync(DateTime date)
        {
            _logger.LogInformation($"Request received for GetFactsByDate for date: {date}");

            var facts = await _factProvider.GetFactsByDateAsync(date);
            var factDTOs = _mapper.Map<IEnumerable<FactsDTO>>(facts);

            return Ok(factDTOs);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<FactsDTO>> UpdateFactAsync(
            int id, [FromBody] FactsDTO factToUpdate)
        {
            _logger.LogInformation("Request received for UpdateFactAsync");

            var fact = _mapper.Map<Fact>(factToUpdate);
            var updatedFact = await _factProvider.UpdateFactAsync(id, fact);
            var factDTO = _mapper.Map<FactsDTO>(updatedFact);

            return Ok(factDTO);
        }
    }
}
