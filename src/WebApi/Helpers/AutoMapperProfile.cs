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

        CreateMap<UpdateRequest, User>()
            .ForAllMembers(x => x.Condition(
                (src, dest, prop) =>
                {
                    if (prop == null) return false;
                    if (prop.GetType() == typeof(string) && string.IsNullOrEmpty((string)prop)) return false;

                    return true;
                }
            ));

        CreateMap<Dto.Series.UpdateRequest, Series>();
        CreateMap<Dto.Episode.UpdateRequest, Episode>();
    }
}