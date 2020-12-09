package day04

import (
	"github.com/vtambourine/adventofcode/2020/challenge"
	"github.com/vtambourine/adventofcode/2020/command"
)

func validPassports(input *challenge.Challenge) int {
	count := 0

	lines := input.Lines()
	for {
		p, ok := parsePassport(lines)

		if p.valid() {
			count++
		}

		if !ok {
			break
		}
	}

	return count
}

func strictlyValidPassports(input *challenge.Challenge) int {
	count := 0

	lines := input.Lines()
	for {
		p, ok := parsePassport(lines)

		if p.strictlyValid() {
			count++
		}

		if !ok {
			break
		}
	}

	return count
}

func Register(s command.Solutions) {
	s.Register(4, "a", validPassports)
	s.Register(4, "b", strictlyValidPassports)
}
