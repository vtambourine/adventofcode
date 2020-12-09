package day02

import (
	"strings"

	"github.com/vtambourine/adventofcode/2020/challenge"
	"github.com/vtambourine/adventofcode/2020/command"
)

func validPassports(input *challenge.Challenge) int {
	valid := 0

	for line := range input.Lines() {
		parts := strings.Split(line, ": ")
		if parsePolicy(parts[0]).valid(parts[1]) {
			valid++
		}
	}

	return valid
}

func strictlyValidPassports(input *challenge.Challenge) int {
	valid := 0

	for line := range input.Lines() {
		parts := strings.Split(line, ": ")
		if parsePolicy(parts[0]).strictlyValid(parts[1]) {
			valid++
		}
	}

	return valid
}

func Register(s command.Solutions) {
	s.Register(2, "a", validPassports)
	s.Register(2, "b", strictlyValidPassports)
}
