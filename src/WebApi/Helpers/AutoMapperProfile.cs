namespace WebApi.Helpers;

using AutoMapper;
using WebApi.Entities;
using WebApi.Dto.Users;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<User, AuthenticateResponse>();

        CreateMap<RegisterRequest, User>();

        CreateMap<UpdateRequest, User>();

        CreateMap<Dto.Series.CreateRequest, Series>();
        CreateMap<Dto.Series.UpdateRequest, Series>();

        CreateMap<Dto.Episode.CreateRequest, Episode>();
        CreateMap<Dto.Episode.UpdateRequest, Episode>();
    }
}