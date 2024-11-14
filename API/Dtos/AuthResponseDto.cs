using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class AuthResponseDto
    {
        public string? Token { get; set; } = string.Empty;
        public bool Success { get; set; }
        public string? Message { get; set; } = string.Empty;
        public string RefreshToken { get; set;} = string.Empty;

    }
}