package com.github.rafli_lutfi.superpos.api.dtos.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCategoryRequestDTO {
    @JsonProperty("name")
    @NotBlank
    private String name;

    @JsonProperty("description")
    private String description;
}
