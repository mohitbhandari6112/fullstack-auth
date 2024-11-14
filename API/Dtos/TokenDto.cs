using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class TokenDto
    {
        public string? RefreshToken { get; set; }
        public string? Token { get; set; }
        public string Email { get; set; } = string.Empty;
    }
}