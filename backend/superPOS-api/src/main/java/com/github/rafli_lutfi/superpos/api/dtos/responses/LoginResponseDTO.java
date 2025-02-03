package com.github.rafli_lutfi.superpos.api.dtos.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDTO {
    @JsonProperty("token")
    private String token;

    @JsonProperty("user")
    private UserResponseDTO user;
}
