package day04

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

const (
	fieldBirthYear      = "byr"
	fieldIssueYear      = "iyr"
	fieldExpirationYear = "eyr"
	fieldHeight         = "hgt"
	fieldHairColor      = "hcl"
	fieldEyeColor       = "ecl"
	fieldPassportID     = "pid"
	fieldCountryID      = "cid"

	keySeparator      = " "
	keyValueSeparator = ":"

	heightCentimetersSuffix = "cm"
	heightInchesSuffix      = "in"
)

var (
	hairColorRegex  = regexp.MustCompile("^#[0-9a-f]{6}$")
	eyeColorRegex   = regexp.MustCompile("^amb|blu|brn|gry|grn|hzl|oth$")
	passportIDRegex = regexp.MustCompile("^[0-9]{9}$")
)

type passport struct {
	BirthYear      string
	IssueYear      string
	ExpirationYear string
	Height         string
	HairColor      string
	EyeColor       string
	PassportID     string
	CountryID      string
}

func parsePassport(lines <-chan string) (*passport, bool) {
	result := &passport{}

	for {
		line, ok := <-lines

		if !ok {
			return result, false
		}

		if line == "" {
			return result, true
		}

		for _, key := range strings.Split(line, keySeparator) {
			keyValue := strings.Split(key, keyValueSeparator)
			if len(keyValue) != 2 {
				panic(fmt.Errorf("invalid field: %s", key))
			}

			switch keyValue[0] {
			case fieldBirthYear:
				result.BirthYear = keyValue[1]
			case fieldIssueYear:
				result.IssueYear = keyValue[1]
			case fieldExpirationYear:
				result.ExpirationYear = keyValue[1]
			case fieldHeight:
				result.Height = keyValue[1]
			case fieldHairColor:
				result.HairColor = keyValue[1]
			case fieldEyeColor:
				result.EyeColor = keyValue[1]
			case fieldPassportID:
				result.PassportID = keyValue[1]
			case fieldCountryID:
				result.CountryID = keyValue[1]
			}
		}
	}
}

func (p *passport) valid() bool {
	return p.BirthYear != "" &&
		p.IssueYear != "" &&
		p.ExpirationYear != "" &&
		p.Height != "" &&
		p.HairColor != "" &&
		p.EyeColor != "" &&
		p.PassportID != ""
}

func (p *passport) strictlyValid() bool {
	if !p.valid() {
		return false
	}

	if birthYear, err := strconv.Atoi(p.BirthYear); err != nil || birthYear < 1920 || birthYear > 2002 {
		return false
	}

	if issueYear, err := strconv.Atoi(p.IssueYear); err != nil || issueYear < 2010 || issueYear > 2020 {
		return false
	}

	if expirationYear, err := strconv.Atoi(p.ExpirationYear); err != nil || expirationYear < 2020 || expirationYear > 2030 {
		return false
	}

	switch {
	case strings.HasSuffix(p.Height, heightCentimetersSuffix):
		if height, err := strconv.Atoi(strings.TrimSuffix(p.Height, heightCentimetersSuffix)); err != nil || height < 150 || height > 193 {
			return false
		}
	case strings.HasSuffix(p.Height, heightInchesSuffix):
		if height, err := strconv.Atoi(strings.TrimSuffix(p.Height, heightInchesSuffix)); err != nil || height < 59 || height > 76 {
			return false
		}
	default:
		return false
	}

	if !hairColorRegex.MatchString(p.HairColor) {
		return false
	}

	if !eyeColorRegex.MatchString(p.EyeColor) {
		return false
	}

	if !passportIDRegex.MatchString(p.PassportID) {
		return false
	}

	return true
}
