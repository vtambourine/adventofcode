package day05

type pass struct {
	row, col, id int
}

func parsePass(partition string) pass {
	row := 1<<7 - 1
	col := 1<<3 - 1
	for i, c := range partition {
		switch c {
		case 'F':
			row -= 1 << (7 - (i + 1))
		case 'L':
			col -= 1 << (3 - (i - 7 + 1))
		}
	}
	return pass{
		row: row,
		col: col,
		id:  row*8 + col,
	}
}
