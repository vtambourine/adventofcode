package day02

import (
	"regexp"

	"github.com/vtambourine/adventofcode/2020/util"
)

type policy struct {
	char rune
	min  int
	max  int
}

var policyRegex = regexp.MustCompile(`(\d+)-(\d+) ([[:lower:]])`)

func parsePolicy(line string) policy {
	matches := policyRegex.FindAllStringSubmatch(line, -1)

	return policy{
		char: []rune(matches[0][3])[0],
		min:  util.MustAtoi(matches[0][1]),
		max:  util.MustAtoi(matches[0][2]),
	}
}

func (p policy) valid(password string) bool {
	count := 0

	for _, r := range password {
		if r == p.char {
			count++
		}
	}

	return count >= p.min && count <= p.max
}

func (p policy) strictlyValid(password string) bool {
	return (rune(password[p.min-1]) == p.char) != (rune(password[p.max-1]) == p.char)
}
