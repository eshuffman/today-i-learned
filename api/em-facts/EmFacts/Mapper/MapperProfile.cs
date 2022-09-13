using AutoMapper;
using EmFacts.Data.Model;
using EmFacts.DTOs;

namespace EmFacts.API
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {

            CreateMap<Fact, FactsDTO>().ReverseMap();
        }
    }
}
